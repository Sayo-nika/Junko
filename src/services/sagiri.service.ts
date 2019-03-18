// Copyright 2019 (c) Clarity Operations LLC
// Licensed under MIT
import { Injectable } from '@nestjs/common';
import { Handler, Source } from 'sagiri';
import { config } from 'src/main';

const sourceLookupClient = new Handler(config.sagiri.key, {numRes: config.sagiri.numRes || 4});

@Injectable()
export class SagiriService {
    async getSource(req: string | Buffer): Promise<Source[]> {

        if (!Buffer.isBuffer(req)) {
            req = Buffer.from(req, 'base64');
        }

        return await sourceLookupClient.getSource(req);
    }
}
