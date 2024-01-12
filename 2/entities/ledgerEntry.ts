import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LedgerEntry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountId: number;

    @Column()
    amount: number;

    constructor(accountId: number, amount: number) {
        this.accountId = accountId;
        this.amount = amount;
    }

}
