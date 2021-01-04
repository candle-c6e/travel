import crypto from 'crypto'
import path from 'path'
import { createWriteStream } from "fs";
import { Resolver, Mutation, Arg } from 'type-graphql';
import { GraphQLUpload, FileUpload } from "graphql-upload";

@Resolver()
export class UploadResolver {
  @Mutation(() => [String])
  async multiUpload(
    @Arg('files', () => [GraphQLUpload]) files: [FileUpload],
    @Arg('type') type: string
  ): Promise<String[]> {
    const filenames: string[] = []
    for (let file of files) {
      const { createReadStream, filename } = await file;
      let basePath = `${__dirname}/../../uploads/`
      basePath = type === 'hotel' ? basePath + 'hotels' : basePath + 'avatars'
      const extensionFile = path.extname(filename)
      const newFilename = crypto.randomBytes(10).toString('hex') + extensionFile
      const finalPath = basePath + '/' + newFilename
      const writableStream = createWriteStream(finalPath, { autoClose: true });

      const success = await new Promise((res, rej) => {
        createReadStream()
          .pipe(writableStream)
          .on("finish", () => res(true))
          .on("error", () => rej(false));
      });

      if (success) {
        filenames.push(newFilename)
      }
    }

    return filenames
  }

  @Mutation(() => String)
  async singleUpload(
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Arg('type') type: string
  ): Promise<String> {
    const { createReadStream, filename } = await file;
    let basePath = `${__dirname}/../../uploads/`
    basePath = type === 'hotel' ? basePath + 'hotels' : basePath + 'avatars'
    const extensionFile = path.extname(filename)
    const newFilename = crypto.randomBytes(10).toString('hex') + extensionFile
    const finalPath = basePath + '/' + newFilename
    const writableStream = createWriteStream(finalPath, { autoClose: true });

    await new Promise((res, rej) => {
      createReadStream()
        .pipe(writableStream)
        .on("finish", () => res(true))
        .on("error", () => rej(false));
    })

    return newFilename
  }
}