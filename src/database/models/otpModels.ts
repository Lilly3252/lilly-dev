import { IBackupCode, IOtpSecret } from "#utils/types/database.js";
import mongoose, { Schema } from "mongoose";

const OtpSecretSchema: Schema = new Schema({
	userId: { type: String, required: true, unique: true },
	secret: { type: String, required: true }
});

export const OtpSecret = mongoose.model<IOtpSecret>("OtpSecret", OtpSecretSchema);

const BackupCodeSchema: Schema = new Schema({
	userId: { type: String, required: true },
	code: { type: String, required: true },
	used: { type: Boolean, default: false }
});

export const BackupCode = mongoose.model<IBackupCode>("BackupCode", BackupCodeSchema);
