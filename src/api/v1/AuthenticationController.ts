import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationDto } from "src/dtos/AuthenticationDto";
import { AuthenticationService } from "src/services/AuthenticationService";

@Controller('authentication')
export class AuthenticationController {

    constructor( 
        private readonly service: AuthenticationService
    ) { }

    @Post('create-auth')
    async create(@Body() payload: AuthenticationDto): Promise<any> {
        return this.service.create(payload)
    }
}