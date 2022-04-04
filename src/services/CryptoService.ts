import { Injectable } from "@nestjs/common";
import * as cryptojs from 'crypto-js';

@Injectable()
export class CryptoService {

    private readonly keyUtf8: string = 'huFpTr9yqaymFMz2ifB7'
    private readonly ivUtf8: string = 'RAUqCbkM7ONT0V3R5nRJ'

    encrypt(value: string): string {
        return cryptojs.AES.encrypt(value, this.keyUtf8, { iv: this.ivUtf8 }).toString()
    }

    decrypt(value: string): string {
        return cryptojs.AES.decrypt(value, this.keyUtf8, { iv: this.ivUtf8 }).toString(cryptojs.enc.Utf8);
    }
}
