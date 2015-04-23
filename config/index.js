// Token TTL (time to live) in seconds
exports.TOKEN_TTL = 60*60*3;

// Token Secret (used for encoding and decoding of tokens)
exports.TOKEN_SECRET = 'awesomesauce';

// Email address and password of email verification ID sender
// Must be a Google or Google Apps account (UMass Apps will work)
exports.VERIFIER_EMAIL_ADDR = 'jyanyuk@umass.edu';
exports.VERIFIER_EMAIL_PASS = 'whuxahtqnwffwbcp';

// Crypto encryption/decryption algorithm
exports.CRYPTO_ALGORITHM = 'aes-256-ctr';

// Crypto Secret (used for encryption and decryption of various elements)
exports.CRYPTO_SECRET = 'awesomesauce';
