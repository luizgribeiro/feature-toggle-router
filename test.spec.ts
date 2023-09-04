import { createFeatureFlagRouter, OpenFeatureClient } from "./index";

describe('createFeatureToggleRouter', () => {

  const openFeatureClientMock: OpenFeatureClient = {
    getBooleanValue: jest.fn()
  };

  const defaultValue = false;

  const trueFlow = {
    flagValue: true,
    flow: () => undefined
  };

  const falseFlow = {
    flagValue: false,
    flow: () => undefined
  }

  it("Should throw if there is no match for the flag value", () => {
    jest.spyOn(openFeatureClientMock, 'getBooleanValue').mockResolvedValueOnce(defaultValue);
    const dummyFlagRouter = createFeatureFlagRouter(openFeatureClientMock, "dummy", defaultValue);


    expect(() => dummyFlagRouter([])).rejects.toThrow();
  });

  it("Should execute the flow associated with true value if the flag value is true", async () => {
    jest.spyOn(openFeatureClientMock, 'getBooleanValue').mockResolvedValueOnce(true);
    const dummyFlagRouter = createFeatureFlagRouter(openFeatureClientMock, "dummy", true);

    const trueReturn = "trueReturn";

    const trueFlowSpy = jest.spyOn(trueFlow, 'flow').mockReturnValueOnce(trueReturn as any);

    const result = await dummyFlagRouter([falseFlow, trueFlow]);

    expect(trueFlowSpy).toHaveBeenCalled();
    expect(result).toBe(trueReturn);
  });

  it("Should execute the flow associated with false value if the flag value is false", async () => {
    jest.spyOn(openFeatureClientMock, 'getBooleanValue').mockResolvedValueOnce(false);
    const dummyFlagRouter = createFeatureFlagRouter(openFeatureClientMock, "dummy", true);

    const falseReturn = "falseReturn";

    const falseFlowSpy = jest.spyOn(falseFlow, 'flow').mockReturnValueOnce(falseReturn as any);

    const result = await dummyFlagRouter([trueFlow, falseFlow,]);

    expect(falseFlowSpy).toHaveBeenCalled();
    expect(result).toBe(falseReturn);
  });
});
