import {ethers} from "hardhat"
import dotenv from 'dotenv'
import type {Preservation} from "../typechain-types";
import {solidityPackedKeccak256} from "ethers/src.ts/hash/solidity";

dotenv.config()

async function main() {

    const target = await ethers.getContractAt('Recovery', process.env.TARGET_ADDRESS_18!)
    // 2 (nonce 1 is for the lost contract)
    const currentNonce = await ethers.provider.getTransactionCount(target.target)
    console.log(`contract nonce for the last deployment: ${currentNonce - 1}`)

    // NOTE: contract address -> keccak256(rlp(deployer address + deployer nonce))[12:32]
    const hash = ethers.keccak256(ethers.encodeRlp([target.target as string, new Uint8Array([currentNonce - 1])]))
    const contractAddrLost = ethers.dataSlice(hash, 12, 32)
    console.log(`the contract address recovered: ${contractAddrLost}`)
    const recovered = await ethers.getContractAt('SimpleToken', contractAddrLost)
    // self destroy to refund the eth in the contract
    console.log(`balance in recovered contract(before): ${await ethers.provider.getBalance(contractAddrLost)}`)
    const [sender] = await ethers.getSigners()
    await recovered.destroy(sender.address)
    console.log(`balance in recovered contract(after): ${await ethers.provider.getBalance(contractAddrLost)}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
