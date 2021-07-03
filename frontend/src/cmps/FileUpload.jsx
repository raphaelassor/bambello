import { Component } from 'react'
import { cloudinaryService } from '../services/cloudinary.service'
export class FileUpload extends Component {
  state = {
    fileUrl: null,
    isUploading: false,
  }
  uploadFile = async (ev) => {
    this.setState({ isUploading: true })

    try{
      const {secure_url} = await cloudinaryService.uploadFile(ev)
      this.props.onFileUpload(secure_url)
    }catch (err){
      console.log('error in getting fileUrl From Cloudinary',err)
    }
    this.setState({ isUploading: false})
  }
  get uploadMsg() {
    const { fileUrl, isUploading } = this.state
    if (fileUrl) return 'File Uploaded'
    return isUploading ? 'Uploading...' : 'Upload Image'
  }
  render() {
    return (
      <div className="upload-preview" >
        <label htmlFor="file-upload">Computer</label>
        <input type="file" onChange={ this.uploadFile } accept="img/*" id="file-upload" />
      </div>
    )
  }
}