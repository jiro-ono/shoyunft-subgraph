import {
  SetBaseURI721,
  SetBaseURI1155,
  SetProtocolFeeRecipient,
  SetOperationalFee,
  SetOperationalFeeRecipient,
  SetDeployerWhitelisted,
  SetStrategyWhitelisted,
  DeployNFT721AndMintBatch,
  DeployNFT721AndPark,
  DeployNFT1155AndMintBatch,
  DeploySocialToken
} from '../../generated/ShoyuFactory/TokenFactory'

import { log, BigInt, BigDecimal } from '@graphprotocol/graph-ts'

import { ShoyuFactory, NFT721Contract, NFT1155, SocialToken } from '../../generated/schema'

import {
  getShoyuFactory,
  getNFT721Contract,
} from '../entities'


export function setBaseURI721(event: SetBaseURI721): void {
  log.info('[ShoyuFactory] Log Set Base URI 721 {}', [
    event.params.uri // string
  ])

  let factory = getShoyuFactory()
  factory.baseURI721 = event.params.uri
  factory.save()
}

export function setBaseURI1155(event: SetBaseURI1155): void {
  log.info('[ShoyuFactory] Log Set Base URI 1155 {}', [
    event.params.uri // string
  ])

  let factory = getShoyuFactory()
  factory.baseURI1155 = event.params.uri
  factory.save()
}

export function setProtocolFeeRecipient(event: SetProtocolFeeRecipient): void {
  log.info('[ShoyuFactory] Log Set Protocol Fee Recipient {}', [
    event.params.recipient.toString() // address
  ])

  let factory = getShoyuFactory()
  factory.protocolFeeRecipient = event.params.recipient
  factory.save()
}

export function setOperationalFee(event: SetOperationalFee): void {
  log.info('[ShoyuFactory] Log Set Operational Fee {}', [
    BigInt.fromI32(event.params.fee).toString() // uint8
  ])

  let factory = getShoyuFactory()
  factory.operationalFee = event.params.fee
  factory.save()
}

export function setOperationalFeeRecipient(event: SetOperationalFeeRecipient): void {
  log.info('[ShoyuFactory] Log Set Operational Fee Receipient {}', [
    event.params.recipient.toString() // address
  ])

  let factory = getShoyuFactory()
  factory.operationalFeeRecipient = event.params.recipient
  factory.save()
}

export function setDeployerWhitelisted(event: SetDeployerWhitelisted): void {
  log.info('[ShoyuFactory] Log Set Deployer Whitelisted {} {}', [
    event.params.deployer.toString(), // address
    event.params.whitelisted == true ? 'true' : 'false' // bool
  ])
  // figure this out & update schema too
}

export function setStrategyWhitelisted(event: SetStrategyWhitelisted): void {
  log.info('[ShoyuFactory] Log Set Strategy Whitelisted {} {}', [
    event.params.strategy.toString(), // address
    event.params.whitelisted == true ? 'true' : 'false' // bool
  ])
  // figure this out and update schema too
}

export function deployNFT721AndMintBatch(event: DeployNFT721AndMintBatch): void {
  log.info('[ShoyuFactory] Log Deploy NFT721 and Mint Batch  {} {} {} {} {} {}', [
    event.params.proxy.toString(), // address
    event.params.owner.toString(), // address
    event.params.name, // string
    event.params.symbol, // string
    event.params.royaltyFeeRecipient.toString(), // address
    BigInt.fromI32(event.params.royaltyFee).toString() // uint8
    // event.params.tokenIds uint256[]
  ])

  let factory = getShoyuFactory()
  let tokenIds: Array<BigInt> = event.params.tokenIds

  let nft = getNFT721Contract(event.params.proxy)
  nft.factory = factory.id
  nft.baseURI = factory.baseURI721.concat(event.params.proxy.toHex())
  nft.owner = event.params.owner
  nft.name = event.params.name
  nft.symbol = event.params.symbol
  nft.royaltyFeeRecipient = event.params.royaltyFeeRecipient
  nft.royaltyFee = event.params.royaltyFee
  nft.totalSupply = tokenIds.length
  nft.save()

  factory.nft721ContractsCount += 1
  factory.save()
}

export function deployNFT721AndPark(event: DeployNFT721AndPark): void {
  log.info('[ShoyuFactory] Log Deploy NFT721 and Park  {} {} {} {} {} {} {}', [
    event.params.proxy.toString(), // address
    event.params.owner.toString(), // address
    event.params.name, // string
    event.params.symbol, // string
    event.params.toTokenId.toString(), // uint256
    event.params.royaltyFeeRecipient.toString(), // address
    BigInt.fromI32(event.params.royaltyFee).toString() // uint8
  ])
  // figure this out, need to figure out mint details n such
}

export function deployNFT1155AndMintBatch(event: DeployNFT1155AndMintBatch): void {
  log.info('[ShoyuFactory] Log Deploy NFT1155 and Mint Batch {} {} {} {}', [
    event.params.proxy.toString(), // address
    event.params.owner.toString(), // address
    event.params.royaltyFeeRecipient.toString(), // address
    BigInt.fromI32(event.params.royaltyFee).toString() // uint8
  ])
  // not sure how to log uint256[] tokenIds or uint256[] amounts
}

export function deploySocialToken(event: DeploySocialToken): void {
  log.info('[ShoyuFactory] Log Deploy Social Token {} {} {} {} {} {}', [
    event.params.proxy.toString(), // address
    event.params.owner.toString(), // address
    event.params.name, // string
    event.params.symbol, // string
    event.params.dividendToken.toString(), // address
    event.params.initialSupply.toString() // uint256 (double check type)
  ])
}
