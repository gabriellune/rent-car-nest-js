import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthenticationDto } from "src/dtos/AuthenticationDto";
import { LoginDto } from "src/dtos/LoginDto";
import { AuthenticationService } from "src/services/AuthenticationService";
import { LocalAuthGuard } from "src/shared/LocalAuthGuard";

@Controller('authentication')
export class AuthenticationController {

    constructor(
        private readonly service: AuthenticationService
    ) { }

    @Post('create-auth')
    async create(@Body() payload: AuthenticationDto): Promise<string> {
        return this.service.create(payload)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any): Promise<Object> {
        return this.service.login(req.user)
    }
}