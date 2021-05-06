import { getCustomRepository ,Repository } from "typeorm"
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UserRepository"


class UsersService {
    private usersRespository: Repository<User>

    constructor() {
        this.usersRespository = getCustomRepository(UsersRepository)
    }

    async findByEmail(email: string) {
        const usersExists = await this.usersRespository.findOne({
           email,
        })

        return usersExists;
    }

    async create(email: string){
        // Verificar se usuario existe
        const usersExists = await this.usersRespository.findOne({
            email,
        })

        // Se existir, retorna o user
        if (usersExists) {
            return usersExists;
        }

        // Se não exitir, salvar no DB
        const user = this.usersRespository.create({
            email,
        });

        await this.usersRespository.save(user);

        return user;

    }
}

export { UsersService }