// Copyright 2019 (c) Clarity Operations LLC
// Licensed under MIT
import { Module } from '@nestjs/common';
import { databaseProviders } from '../providers/database.provider';

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
