import { axiosService } from "./axios.service";
import { urls } from "../constants";
import { IComment } from "../interfaces";
import { IRes } from "../types";

class CommentService {
    public addComment(orderId: number, comment: IComment): IRes<IComment> {
        return axiosService.post(urls.commentsAPI.comments(orderId), comment);
    };
}

export const commentService = new CommentService();
