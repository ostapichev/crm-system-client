import { axiosService } from "./axios.service";
import { IRes } from "../types";
import { IComment } from "../interfaces";
import { urls } from "../constants";

class CommentService {
    create(orderId: number, comment: IComment): IRes<IComment> {
        return axiosService.post(urls.commentsAPI.create(orderId), comment);
    };
}

export const commentService = new CommentService();
