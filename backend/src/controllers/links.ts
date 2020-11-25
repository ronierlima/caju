import {Request,Response, text} from 'express';
import {Link} from '../models/link';
import linksRepository from '../models/linkRepository';
import utils from '../utils';

const links : Link[] = [];
let proxID = 1;

async function postLink(req: Request, res: Response){
    
    const link = req.body as Link;

    link.code = utils.generationCode();
    link.hits = 0;

    const result = await linksRepository.add(link);

    if(!result.id) return res.status(400); 

    link.id = result.id!;

    res.status(201).json(link); 
};

async function getLink(req: Request, res: Response){

    const code = req.params.code as string;

    const link = await linksRepository.findByCode(code);

    if(!link)
        res.status(404).json({"msg":"Este link ainda não existe!"});
    else
        res.status(200).json(link);
};

async function hitLink(req: Request, res: Response){

    const code = req.params.code as string;

    const link = await linksRepository.hit(code);

    if(!link)
        res.sendStatus(404).json({"msg":"Este link ainda não existe!"});
    else
        res.status(200).json(link);
};

export default {
    postLink,
    getLink,
    hitLink
};