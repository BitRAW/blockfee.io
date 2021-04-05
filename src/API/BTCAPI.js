const genesisBlockReward = 50
const blocksUntilHalving = 210000

function calculateBlockSubsidyInBitcoin(block_number) {
  return (
    genesisBlockReward /
    Math.pow(2, Math.floor(block_number / blocksUntilHalving))
  )
}

function calculateBlockSubsidyInSats(block_number) {
  return calculateBlockSubsidyInBitcoin(block_number) * 100000000
}

function calculateBlockSubsidyRatio(block_number, total_fee) {
  return (
    calculateBlockSubsidyInSats(block_number) /
    (calculateBlockSubsidyInSats(block_number) + total_fee)
  )
}

export {
  calculateBlockSubsidyRatio,
  calculateBlockSubsidyInSats,
  calculateBlockSubsidyInBitcoin,
  genesisBlockReward,
  blocksUntilHalving,
}
