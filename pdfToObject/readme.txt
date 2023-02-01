How to use:

create new PdfToObject(filename,ObjectClass);
        filename
requires path to a pdf document,

        ObjectClass
Give class of an object that will be created and where the values
from pdf will be stored.

        KeyContainer
a keycontainer, holds key mapping between pdf and object.
! Requires KeysObject to be created. Check examples for example 
Keycontainer

        BaseComponentClass
These keys will be skipped. Point is to store maps, arrays and functionality in baseclass. Child classes....

