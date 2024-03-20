import { TypeOrmModuleOptions } from "@nestjs/typeorm";

function ormConfig(): TypeOrmModuleOptions {
    const commonConf = {
        synchronize: false,
        entities: [__dirname + '/entities/**/*{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        migrationsRun: false,
        
    };
    

    return {
        name: 'default',
        type: 'mysql',
        database: process.env.DATABASE_SCHEMA,
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        logging: true,
        synchronize: commonConf.synchronize,
        entities: commonConf.entities,
        migrations: commonConf.migrations,
        migrationsRun: commonConf.migrationsRun,
        autoLoadEntities: true,
    };
}

export { ormConfig };