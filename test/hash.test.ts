import Blake2b from "../src/utils/blake2b";

describe("Blake2b", () => {
  let blake2b: Blake2b;

  beforeEach(() => {
    blake2b = new Blake2b();
  });

  describe("hashString", () => {
    it("should return the correct hash for a given string", () => {
      const input = "Hello, world!";
      const expectedHash =
        "7da3471d0000000011acad2c00000000918d8a3400000000d6d29ff800000000f9d5a051000000004a6df19a00000000a9c9881f000000007442755b00000000";

      const actualHash = blake2b.hashString(input);

      expect(actualHash).toBe(expectedHash);
    });
  });
});
