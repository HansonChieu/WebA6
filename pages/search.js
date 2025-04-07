import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '../lib/userData';

const AdvancedSearch = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
 
  const submitForm = async(data) => {
    let queryString = `searchBy=${data.searchBy}`;

    if (data.geoLocation) {
      queryString += `&geoLocation=${encodeURIComponent(data.geoLocation)}`;
    }
    if (data.medium) {
      queryString += `&medium=${encodeURIComponent(data.medium)}`;
    }
    if (data.isOnView) {
      queryString += `&isOnView=${data.isOnView}`;
    }
    if (data.isHighlight) {
      queryString += `&isHighlight=${data.isHighlight}`;
    }
    if (data.q) {
      queryString += `&q=${data.q}`;
    }
    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?${queryString}`);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Form.Group className="mb-3">
        <Form.Label>Search By</Form.Label>
        <Form.Select {...register('searchBy', { required: true })}>
          <option value="title">Title</option>
          <option value="tags">Tags</option>
          <option value="artistOrCulture">Artist or Culture</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Geo Location</Form.Label>
        <Form.Control type="text" {...register('geoLocation')} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Medium</Form.Label>
        <Form.Control type="text" {...register('medium')} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Is On View</Form.Label>
        <Form.Check type="checkbox" {...register('isOnView')} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Is Highlight</Form.Label>
        <Form.Check type="checkbox" {...register('isHighlight')} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Search Query</Form.Label>
        <Form.Control
          type="text"
          {...register('q', { required: true })}
          className={errors.q ? 'is-invalid' : ''}
        />
        {errors.q && <div className="invalid-feedback">This field is required.</div>}
      </Form.Group>

      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default AdvancedSearch;