import { mutationResolvers } from "../../src/graphql/resolvers/mutation.resolver";
import { ImportService } from "../../src/services/import.service";

jest.mock("../../src/services/import.service");

describe("mutationResolvers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it("should call ImportService.importLeague and return success message", async () => {
    (ImportService.importLeague as jest.Mock).mockResolvedValue("League imported successfully");
    
    const result = await mutationResolvers.Mutation.importLeague({}, { leagueCode: "PL" });
    
    expect(ImportService.importLeague).toHaveBeenCalledWith("PL");
    expect(result).toBe("League imported successfully");
  });
  
  it("should handle errors from ImportService.importLeague", async () => {
    (ImportService.importLeague as jest.Mock).mockRejectedValue(new Error("Import failed"));
    
    await expect(mutationResolvers.Mutation.importLeague({}, { leagueCode: "PL" })).rejects.toThrow(
      "Import failed"
    );
  });
});
