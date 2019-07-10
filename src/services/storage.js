const request = require('request-promise');
const fs = require('fs').promises;

class FileSystemStorage {

  async storeByUrl(userId, fileUrl) {
    let file = await request({
      uri: fileUrl,
      encoding: null
    });
    await this.remove(userId);
    await fs.writeFile(`storage/${userId}`, file, 'binary');
    return file;
  }

  async getFile(userId) {
    try {
      const buffer =  await fs.readFile(`storage/${userId}`);
      return buffer.toString();
    } catch (e) {
      if (e.code != 'ENOENT') {
        throw e;
      }
      return null;
    }
  }

  async remove(userId){
    try {
      await fs.unlink(`storage/${userId}`);

    } catch (e) {
      if (e.code != 'ENOENT') {
        throw e;
      }
    }
  }

}

module.exports = new FileSystemStorage();