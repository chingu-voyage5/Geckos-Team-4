require('../styles/app.css')
import num from './test';
//sara:comment out following line
// import * as setTime from './clock';

import { setTime } from './clock';

//sara:comment out following line
// console.log(`I imported ${num} from another module!! ${clock}` );
//sara:added following line
setInterval(setTime, 1000);




