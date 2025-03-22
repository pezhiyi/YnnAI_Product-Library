import fs from 'fs/promises';
import path from 'path';

const URL_MAPPING_FILE = path.join(process.cwd(), 'data', 'url_mapping.json');

// 确保目录存在
async function ensureDirectoryExists() {
  try {
    await fs.mkdir(path.dirname(URL_MAPPING_FILE), { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      console.error('创建目录失败:', error);
    }
  }
}

/**
 * 获取存储的URL映射
 * @returns {Promise<Object>} URL映射对象
 */
export async function getStoredUrls() {
  try {
    await ensureDirectoryExists();
    const data = await fs.readFile(URL_MAPPING_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // 文件不存在，返回空对象
      return {};
    }
    console.error('读取URL映射失败:', error);
    return {};
  }
}

/**
 * 保存URL映射
 * @param {Object} urlMapping URL映射对象
 * @returns {Promise<void>}
 */
export async function saveStoredUrls(urlMapping) {
  try {
    await ensureDirectoryExists();
    await fs.writeFile(
      URL_MAPPING_FILE,
      JSON.stringify(urlMapping, null, 2),
      'utf8'
    );
  } catch (error) {
    console.error('保存URL映射失败:', error);
  }
} 