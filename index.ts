export interface OpenFeatureClient {
  getBooleanValue: (flag: string, defaultValue: boolean) => Promise<boolean>; 
}

type flowSpec<T=any> = {
  flagValue: boolean;
  flow: ()=>T;
}

export const createFeatureFlagRouter = (client: OpenFeatureClient, flag: string, defaultValue: boolean) => async (flows: flowSpec[]) => {
  const flagValue = await client.getBooleanValue(flag, defaultValue);  

  const match = flows.find(flow => flow.flagValue === flagValue);

  if (!match) {
    throw new Error(`Feature flag router: could not find a match for ${flag} for ${flagValue} on the flows array provided`);
  }
  
  return match.flow();
}

