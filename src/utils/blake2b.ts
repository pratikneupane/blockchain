class Blake2b {
  private static readonly BLOCK_SIZE = 128;
  private static readonly IV: Uint32Array = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
    0x1f83d9ab, 0x5be0cd19,
  ]);

  private static readonly SIGMA: number[][] = [
    [0, 14],
    [10, 4],
    [4, 8],
    [8, 9],
    [9, 13],
    [13, 6],
    [6, 15],
    [15, 1],
    [1, 12],
    [12, 0],
    [0, 2],
    [2, 11],
    [11, 7],
    [7, 5],
    [5, 3],
    [3, 10],
  ];

  private state: Uint32Array;
  private buffer: Uint8Array;
  private bufferLength: number;
  private finalized: boolean;

  constructor() {
    this.state = new Uint32Array(Blake2b.IV);
    this.buffer = new Uint8Array(Blake2b.BLOCK_SIZE);
    this.bufferLength = 0;
    this.finalized = false;
  }

  private compress(): void {
    const M = new Uint32Array(16);
    const V = new Uint32Array(32);

    // Initialize V with the current state
    for (let i = 0; i < 8; i++) {
      V[i] = this.state[i];
      V[i + 8] = Blake2b.IV[i];
    }

    // XOR message bytes with V
    for (let i = 0; i < 16; i++) {
      M[i] =
        this.buffer[i * 4] |
        (this.buffer[i * 4 + 1] << 8) |
        (this.buffer[i * 4 + 2] << 16) |
        (this.buffer[i * 4 + 3] << 24);
      V[i] ^= M[i];
    }

    // Mix columns of V
    for (let round = 0; round < 12; round++) {
      this.G(V, M, 0, 4, 8, 12, 0);
      this.G(V, M, 1, 5, 9, 13, 1);
      this.G(V, M, 2, 6, 10, 14, 2);
      this.G(V, M, 3, 7, 11, 15, 3);

      this.G(V, M, 0, 5, 10, 15, 4);
      this.G(V, M, 1, 6, 11, 12, 5);
      this.G(V, M, 2, 7, 8, 13, 6);
      this.G(V, M, 3, 4, 9, 14, 7);

      this.G(V, M, 0, 6, 12, 14, 8);
      this.G(V, M, 1, 7, 13, 15, 9);
      this.G(V, M, 2, 4, 10, 11, 10);
      this.G(V, M, 3, 5, 8, 9, 11);
    }

    // Update state
    for (let i = 0; i < 8; i++) {
      this.state[i] ^= V[i] ^ V[i + 8];
    }
  }

  private G(
    V: Uint32Array,
    M: Uint32Array,
    a: number,
    b: number,
    c: number,
    d: number,
    i: number
  ): void {
    V[a] = (V[a] + V[b] + M[Blake2b.SIGMA[i][0]]) | 0;
    V[d] = (V[d] ^ V[a]) >>> 16;
    V[c] = (V[c] + V[d]) | 0;
    V[b] = (V[b] ^ V[c]) >>> 12;
    V[a] = (V[a] + V[b] + M[Blake2b.SIGMA[i][1]]) | 0;
    V[d] = (V[d] ^ V[a]) >>> 8;
    V[c] = (V[c] + V[d]) | 0;
    V[b] = (V[b] ^ V[c]) >>> 7;
  }

  update(data: Uint8Array): void {
    if (this.finalized) {
      throw new Error("Update error: Blake2b instance has been finalized.");
    }

    let position = 0;
    const dataLength = data.length;

    while (position < dataLength) {
      const remainingBytes = dataLength - position;
      const bufferSpace = Blake2b.BLOCK_SIZE - this.bufferLength;
      const bytesToCopy = Math.min(remainingBytes, bufferSpace);

      this.buffer.set(
        data.subarray(position, position + bytesToCopy),
        this.bufferLength
      );
      this.bufferLength += bytesToCopy;
      position += bytesToCopy;

      if (this.bufferLength === Blake2b.BLOCK_SIZE) {
        this.compress();
        this.bufferLength = 0;
      }
    }
  }

  finalize(): Uint8Array {
    if (!this.finalized) {
      const paddingBytes = Blake2b.BLOCK_SIZE - this.bufferLength;
      const messageLengthBytes = new Uint8Array(16); // Assumes the message length is 64 bits
      const hash = new Uint8Array(64); // Assumes the hash size is 512 bits

      this.buffer.set(new Uint8Array(paddingBytes), this.bufferLength);
      this.buffer.set(messageLengthBytes, Blake2b.BLOCK_SIZE - 16);

      this.compress();

      for (let i = 0; i < 8; i++) {
        hash.set(new Uint8Array(this.state.buffer, i * 4, 4), i * 8);
      }

      this.finalized = true;
      return hash;
    } else {
      throw new Error(
        "Finalize error: Blake2b instance has already been finalized."
      );
    }
  }

  hashString(data: string): string {
    const encoder = new TextEncoder();
    const dataBytes = encoder.encode(data);

    this.update(dataBytes);
    const hashBytes = this.finalize();

    // Convert the hash bytes to a hexadecimal string representation
    const hashString = Array.from(hashBytes)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return hashString;
  }
}


export default Blake2b;
