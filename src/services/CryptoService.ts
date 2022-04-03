import { Injectable } from "@nestjs/common";
import * as cryptojs from 'crypto-js';
import { Environment } from "roit-environment";

@Injectable()
export class CryptoService {

    private readonly keyUtf8 = cryptojs.enc.Utf8.parse(Environment.getProperty('cryptoKey'));
    private readonly ivUtf8 = cryptojs.enc.Utf8.parse(Environment.getProperty('cryptoIv'));

    encrypt(value: string): string {
        return cryptojs.AES.encrypt(value, this.keyUtf8, { iv: this.ivUtf8 }).toString()
    }

    decrypt(value: string): string {
        return cryptojs.AES.decrypt(value, this.keyUtf8, { iv: this.ivUtf8 }).toString(cryptojs.enc.Utf8);
    }
}
