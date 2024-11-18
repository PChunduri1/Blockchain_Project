async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const IdentityVerification = await ethers.getContractFactory("IdentityVerification");
  const identityVerification = await IdentityVerification.deploy(deployer.address);

  console.log("IdentityVerification deployed to:", identityVerification.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

