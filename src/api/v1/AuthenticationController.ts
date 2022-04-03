import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthenticationDto } from "src/dtos/AuthenticationDto";
import { LoginDto } from "src/dtos/LoginDto";
import { AuthenticationService } from "src/services/AuthenticationService";
import { LocalAuthGuard } from "src/strategy/LocalAuthGuard";

@Controller('authentication')
export class AuthenticationController {

    constructor(
        private readonly service: AuthenticationService
    ) { }

    @Post('create-auth')
    async create(@Body() payload: AuthenticationDto): Promise<any> {
        return this.service.create(payload)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() payload: LoginDto): Promise<any> {
        return 'success'
    }
}