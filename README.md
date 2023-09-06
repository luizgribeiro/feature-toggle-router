# feature-toggle-router

### Overview

Feature toggle router is a package that makes refactoring easier while using feature toggles through OpenFeature clients. It's main goal is to hide all the complexity of `ifs` and `elses` used in a codebase to deal with one single feature flag.

### Usecases and examples

You can find an example of it's usage in [this repo](https://github.com/luizgribeiro/feature-toggle-router-example). The code bellow shows the suggested way to use it for a feature flag called `registerUser`.


```javascript
//utils/featureToggleRouters.js
import { OpenFeature } from '@openfeature/js-sdk';

const client = OpenFeature.getClient();

const registerUserFFRouter = createFeatureFlagRouter(client, "registerUser", false);

exports registerUserFFRouter;
```

```javascript
//controllers/registerUser.js

import { registerUserFFRouter } from '../utils/featureToggleRouters.js';

//configuring route handler
app.post('/user', async (req, res) => {
    const status = await registerUserFFRouter([
        {
            flagValue: true,
            flow: () => {
                //handle user registration
                return 201
            }
        },
        {
            flagValue: false,
            flow: () => {
                return 404
            }
        }
    ]);

    res.status(status);
    res.send();
});
```

By using `registerUserFFRouter` in multiple places over the project when a refactor is needed to make only one logical path available one can simply delete it from `featureToggleRouters` file and the app won't be able to run until all places where it was used are refactored as well.
