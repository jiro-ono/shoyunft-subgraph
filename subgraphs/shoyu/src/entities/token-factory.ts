import { ShoyuFactory } from '../../generated/schema'
import { TokenFactory as TokenFactoryContract } from '../../generated/ShoyuFactory/TokenFactory'
import { BigInt, dataSource } from '@graphprotocol/graph-ts'

export function getShoyuFactory(): ShoyuFactory {
  let factory = ShoyuFactory.load(dataSource.address().toHex())

  if (factory === null) {
    factory = new ShoyuFactory(dataSource.address().toHex())
    let factoryContract = TokenFactoryContract.bind(dataSource.address())

    let protocolFeeInfo = factoryContract.protocolFeeInfo()
    let operationalFeeInfo = factoryContract.operationalFeeInfo()

    factory.protocolFeeRecipient = protocolFeeInfo.value0
    factory.protocolFee = protocolFeeInfo.value1
    factory.operationalFeeRecipient = operationalFeeInfo.value0
    factory.operationalFee = operationalFeeInfo.value1
    factory.baseURI721 = factoryContract.baseURI721()
    factory.baseURI1155 = factoryContract.baseURI1155()
    factory.nft721ContractsCount = 0
  }

  factory.save()

  return factory as ShoyuFactory
}
