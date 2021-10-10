import { NFT721 } from '../../generated/schema'

import { Address, BigInt, Bytes, dataSource, ethereum } from '@graphprotocol/graph-ts'
import { getNFT721Contract } from './nft721-contract'

export function getNFT721(address: Address, tokenId: BigInt): NFT721 {
  let nftContract = getNFT721Contract(address)
  let id = address.toHex().concat('-').concat(tokenId.toString())

  let nft = NFT721.load(id)

  if (nft === null) {
    nft = new NFT721(id)
    nft.contract = nftContract.id
    nft.currentOwner = nftContract.owner as Bytes
    nft.uri = nftContract.baseURI.concat('/').concat(tokenId.toString()).concat('.json')
  }

  nft.save()

  return nft as NFT721
}
