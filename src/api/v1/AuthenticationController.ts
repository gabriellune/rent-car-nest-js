import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthenticationDto } from "src/dtos/AuthenticationDto";
import { LoginDto } from "src/dtos/LoginDto";
import { AuthenticationService } from "src/services/AuthenticationService";
import { LocalAuthGuard } from "src/shared/LocalAuthGuard";

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {

    constructor(
        private readonly service: AuthenticationService
    ) { }

    @Post('create-auth')
    @ApiOperation({ summary: 'Create an user to authentic'})
    async create(@Body() payload: AuthenticationDto): Promise<string> {
        return this.service.create(payload)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ summary: 'Login to get your authorization token'})
    async login(@Request() req: any, @Body() _payload: LoginDto): Promise<Object> {
        return this.service.login(req.user)
    }
}