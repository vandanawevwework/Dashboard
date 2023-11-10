import { useState, useEffect, useRef } from 'react';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusCircleOutlined } from '@ant-design/icons';

export default function SelectAsync({
  entity,
  displayLabels = ['name'],
  outputValue = '_id',
  value,
  onChange,
  redirectLabel = '',
  withRedirect = false,
  urlToRedirect = '/',
  valueTransformer = null,
}) {
  const [selectOptions, setOptions] = useState([]);
  const [currentValue, setCurrentValue] = useState(undefined);

  const navigate = useNavigate();

  const asyncList = () => {
    return request.list({ entity });
  };
  const { result, isLoading: fetchIsLoading, isSuccess } = useFetch(asyncList);
  useEffect(() => {
    isSuccess && setOptions(valueTransformer ? valueTransformer(result) : result);
  }, [isSuccess]);

  const labels = (optionField) => {
    return displayLabels.map((x) => optionField[x]).join(' ');
  };
  useEffect(() => {
    // this for update Form , it's for setField
    if (value) {
      setCurrentValue(value[outputValue] || value); // set nested value or value
      onChange(value[outputValue] || value);
    }
  }, [value]);

  const handleSelectChange = (newValue) => {
    if (newValue === 'redirectURL') {
      // Navigate to another page when "Add payment" is selected
      navigate(urlToRedirect);
    } else {
      // Handle other select options
      if (onChange) {
        onChange(newValue[outputValue] || newValue);
      }
    }
  };

  return (
    <Select
      loading={fetchIsLoading}
      disabled={fetchIsLoading}
      value={currentValue}
      onChange={handleSelectChange}
    >
      {selectOptions.length === 0 && withRedirect && (
        <Select.Option key="redirectURL" value="redirectURL">
          <PlusCircleOutlined /> {redirectLabel}
        </Select.Option>
      )}
      {selectOptions.map((optionField) => (
        <Select.Option
          key={optionField[outputValue] || optionField}
          value={optionField[outputValue] || optionField}
        >
          {labels(optionField)}
        </Select.Option>
      ))}
    </Select>
  );
}
