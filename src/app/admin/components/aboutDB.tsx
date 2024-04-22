import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AboutDB = () => {
  const [aboutDataList, setAboutDataList] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/about');
      setAboutDataList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleItemClick = (data: any) => {
    console.log("Clicked item:", data);
    setSelectedData(data);
    setFormData({
      title: data.title,
      description: data.description
    });
  };

  const handleChange = (value: any) => {
    setFormData({
      ...formData,
      description: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/about/${selectedData.id}`, formData);
      fetchData(); // Refresh data after update
      setSelectedData(null); // Clear selected data
      setFormData({ title: '', description: '' }); // Clear form data
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <ul>
            {aboutDataList.map((data) => (
              <li key={data.id} onClick={() => handleItemClick(data)} className="cursor-pointer hover:text-blue-500">{data.title}</li>
            ))}
          </ul>
        </div>
        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-2">Edit Data</h2>
          {selectedData ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <ReactQuill
                  value={formData.description}
                  onChange={handleChange}
                  className="border rounded-md"
                  modules={{
                    toolbar: [
                      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                      [{size: []}],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{'list': 'ordered'}, {'list': 'bullet'}, 
                       {'indent': '-1'}, {'indent': '+1'}],
                      ['link', 'image', 'video'],
                      ['clean']
                    ],
                  }}
                  formats={[
                    'header', 'font', 'size',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'image', 'video'
                  ]}
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save Changes</button>
            </form>
          ) : (
            <p>Select an item to edit</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutDB;
