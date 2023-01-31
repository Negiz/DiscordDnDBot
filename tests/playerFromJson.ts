import {Player} from '../src/classes/player'
import { FBaseComponent } from '../pdfToObject/baseClasses/baseComponent';
import { FItemType } from '../src/classes/playercomponents';
import {ObjectFromJson} from '../pdfToObject/utility/objFromJson'



let playerfile = './tests/iofiles/playerJson.txt';
let playerObj:Player = new Player();

ObjectFromJson(playerfile,playerObj);


console.log(playerObj);

