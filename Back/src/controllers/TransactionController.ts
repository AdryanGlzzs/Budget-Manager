import { Router } from "express";
import { Request, Response } from "express";

export const TransactionController = Router()

TransactionController.post('/transaction',(req: Request, res: Response)=>{
    const {id, name, category, dateString, amount, icon, color, type, status} = req.body

    
})