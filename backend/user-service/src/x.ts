import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import session from "express-session";

const ACCESS_TOKEN = "ACCESS_SECRET_KEY";
const REFRESH_TOKEN = "REFRESH_SECRET_KEY";

interface Infor {
    username: string;
    password: string;
    userid: string;
    code: string;
}

const information: Infor = {
    username: "user_dev01",
    password: "Dev@2025!",
    userid: "112233445566",
    code: "A1234QsXz99a",
};

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: "lax",
        },
    })
);

const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
    res.send(`Service is running port : ${PORT}`);
});

app.post("/auth/login", (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (
        username === information.username &&
        password === information.password
    ) {
        const accessToken = jwt.sign({ username }, ACCESS_TOKEN, {
            expiresIn: "15m",
        });

        const refreshToken = jwt.sign({ username }, REFRESH_TOKEN, {
            expiresIn: "7d",
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            accessToken,
            userid: information.userid,
            success: "Đăng nhập thành công",
        });
    } else {
        res.status(400).json({
            message: "Tài khoản hoặc mật khẩu không chính xác",
        });
    }
});

app.post("/auth/refresh", (req: Request, res: Response) => {
    const refresh = req.cookies.refreshToken;

    if (!refresh) {
        res.status(400).json({
            message: "Token không tồn tại",
        });
    }

    jwt.verify(refresh, REFRESH_TOKEN, (error: any, user: any) => {
        if (error)
            res.status(400).json({
                message: "Token không chính xác",
            });

        const accessToken = jwt.sign(
            { username: user.username },
            ACCESS_TOKEN,
            { expiresIn: "15m" }
        );

        res.status(200).json({
            accessToken,
            success: "Đăng nhập thành công",
        });
    });
});

app.post("/auth/forgot-password", (req: Request, res: Response) => {
    const { ...user } = req.body;

    if (
        user.code === information.code &&
        user.username === information.username
    ) {
        res.status(200).json({
            userid: information.userid,
            success: "Tài khoản tồn tại",
        });
    } else {
        res.status(400).json({
            message: "Tài khoản không tồn tại",
        });
    }
});

app.post("/auth/user-id", (req: Request, res: Response) => {
    const { userid } = req.body;

    if (userid === information.userid) {
        res.status(200).json({
            username: information.username,
            success: "Đã lấy được username",
        });
    } else {
        res.status(400).json({
            message: "Tài khoản không tồn tại",
        });
    }
});

app.post("/auth/reset-password", (req: Request, res: Response) => {
    const { ...user } = req.body;

    if (user.username === information.username) {
        information.password = user.password;

        res.status(200).json({
            success: "Thay đổi mật khẩu thành công",
        });
    } else {
        res.status(400).json({
            message: "Thay đổi mật khẩu thất bại",
        });
    }
});

app.get("/auth/can-access-forgot", (req: Request, res: Response) => {
    if (req.session?.allowForgot) {
        return res.sendStatus(200);
    }
    return res.sendStatus(404);
});

app.get("/auth/can-access-reset", (req: Request, res: Request) => {
    if (req.session?.allowReset) {
        return res.sendStatus(200);
    }
    return res.sendStatus(404);
});

app.post("/auth/request-forgot", (req: Request, res: Response) => {
    req.session.allowForgot = true;

    return res.status(200).json({
        message: "OK",
    });
});

app.post("/auth/request-reset", (req: Request, res: Response) => {
    req.session.allowReset = true;

    return res.status(200).json({
        message: "OK",
    });
});

app.post("/auth/request-register", (req: Request, res: Response) => {
    req.session.allowRegister = true;

    return res.status(200).json({
        message: "OK",
    });
});

app.post("/auth/clear-login", (req: Request, res: Response) => {
    req.session.allowRegister = false;
    req.session.allowForgot = false;
    req.session.allowReset = false;

    return res.status(200).json({
        message: "OK",
    });
});

app.post("/auth/clear-forgot", (req: Request, res: Response) => {
    req.session.allowReset = false;

    return res.status(200).json({
        message: "OK",
    });
});

app.post("/auth/register", (req: Request, res: Response) => {
    const { ...user } = req.body;

    if (
        user.code === information.code &&
        user.username === information.username
    ) {
        res.status(200).json({
            success: "Tạo tài khoản thành công",
        });
    } else {
        res.status(200).json({
            message: "Mã giới thiệu hoặc tài khoản đã tồn tại",
        });
    }
});

app.get("/auth/can-access-register", (req: Request, res: Request) => {
    if (req.session?.allowRegister) {
        return res.sendStatus(200);
    }
    return res.sendStatus(404);
});

app.get("/auth/profile", (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({
            message: "Không tồn tại token",
        });
    }

    try {
        const user = jwt.verify(token, ACCESS_TOKEN);
        res.status(200).json({
            user,
            success: "Truy xuất thành công",
        });
    } catch (error: any) {
        res.status(401).json({
            message: "Token không tồn tại",
        });
    }
});

app.post("/auth/logout", (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        return res.status(200).json({ success: "Đăng xuất thành công" });
    } catch (error: any) {
        return res.status(500).json({ message: "Server lỗi khi logout" });
    }
});

app.listen(PORT);
