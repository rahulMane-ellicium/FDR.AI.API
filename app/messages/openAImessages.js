import {errorStatusCodes,successStatusCodes} from '../constants/statusCodes.js'
import {errorMessages} from '../constants/response.messages.js'
import { MessageHandler } from "../../utils/response.handlers.js"

const {badRequest}=errorStatusCodes


const {emptyFileMessage,wrongFile}=errorMessages


export const openAImessages={
    empty_File:new MessageHandler(badRequest,emptyFileMessage),
    wrong_file:new MessageHandler(badRequest,wrongFile)
}