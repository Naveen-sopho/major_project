const Block = require('./block');

const tempBlock = Block.mineBlock(Block.genesis(),'first');
console.log(tempBlock.toString());