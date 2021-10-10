import {
  OwnershipTransferred,
  ParkTokenIds,
  Transfer,
  Burn,
  SetRoyaltyFee,
  SetRoyaltyFeeRecipient,
  SetTokenURI,
  SetBaseURI
} from '../../generated/templates/NFT721Contract/NFT721V0'

import { Address, BigInt, dataSource, log } from '@graphprotocol/graph-ts'

import { getNFT721Contract, getNFT721 } from '../entities'

export function ownerShipTrasferred(event: OwnershipTransferred): void {
  log.info('[NFT721Contract] Log Ownership Transferred {} {}', [
    event.params.previousOwner.toString(), // address
    event.params.newOwner.toString() // address
  ])

  let nftContract = getNFT721Contract(dataSource.address())
  nftContract.owner = event.params.newOwner
  nftContract.save()
}

export function parkTokenIds(event: ParkTokenIds): void {
  log.info('[NFT721Contract] Log Park Token Ids {}', [
    event.params.toTokenId.toString() // uint256
  ])
}

export function transfer(event: Transfer): void {
  log.info('[NFT721Contract] Log Transfer {} {} {}', [
    event.params.from.toString(), // address
    event.params.to.toString(), // address
    event.params.tokenId.toString() // uint256
  ])

  let nft = getNFT721(dataSource.address(), event.params.tokenId)
  nft.currentOwner = event.params.to
  nft.save()
}

export function burn(event: Burn): void {
  log.info('[NFT721Contract] Log Burn {} {}', [
    event.params.tokenId.toString(), // uint256
    event.params.label.toString(), // uint256
    event.params.data.toString() // bytes32
  ])

  let nft = getNFT721(dataSource.address(), event.params.tokenId)
  nft.currentOwner = Address.fromString('0x0000000000000000000000000000000000000000')
  nft.save()
}

export function setRoyaltyFeeRecipient(event: SetRoyaltyFeeRecipient): void {
  log.info('[NFT721Contract] Log Set Royalty Fee Recipient', [
    event.params.recipient.toString() // address
  ])

  let nftContract = getNFT721Contract(dataSource.address())
  nftContract.royaltyFeeRecipient = event.params.recipient
  nftContract.save()
}

export function setRoyaltyFee(event: SetRoyaltyFee): void {
  log.info('[NFT721Contract] Log Set Royalty Fee', [
    BigInt.fromI32(event.params.fee).toString() // uint8
  ])

  let nftContract = getNFT721Contract(dataSource.address())
  nftContract.royaltyFee = event.params.fee
  nftContract.save()
}

export function setTokenURI(event: SetTokenURI): void {
  log.info('[NFT721Contract] Log Set Token URI', [
    event.params.tokenId.toString(), // uint256
    event.params.uri // string
  ])

  let nft = getNFT721(dataSource.address(), event.params.tokenId)
  nft.uri = event.params.uri
  nft.save()
}

export function setBaseURI(event: SetBaseURI): void {
  log.info('[NFT721Contract] Log Set Base URI', [
    event.params.uri // string
  ])

  let nftContract = getNFT721Contract(dataSource.address())
  nftContract.baseURI = event.params.uri
  nftContract.save()
}
