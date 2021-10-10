import { NFT721Contract } from '../../generated/schema'
import { NFT721Contract as NFT721ContractTemplate } from '../../generated/templates'

import { Address, dataSource, ethereum } from '@graphprotocol/graph-ts'
import { getShoyuFactory } from './token-factory'


export function getNFT721Contract(address: Address): NFT721Contract {
  let nft = NFT721Contract.load(address.toHex())

  if (nft === null) {
    nft = new NFT721Contract(address.toHex())
    NFT721ContractTemplate.create(address)
  }

  nft.save()

  return nft as NFT721Contract
}
