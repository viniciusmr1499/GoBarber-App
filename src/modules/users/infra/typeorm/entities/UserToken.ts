import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Generated
} from 'typeorm';

@Entity('user_tokens')
export default class UserToken {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
