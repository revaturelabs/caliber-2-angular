export class Trainer {
    trainerId: number;
    name: string;
    title: string;
    email: string;
    tier: string;

    constructor(trainerId: number, name: string, title: string,
        email: string, tier: string) {
            this.trainerId = trainerId;
            this.name = name;
            this.title = title;
            this.email = email;
            this.tier = tier;
        }
}
