import { Button, Card, CardContent, Container, FormControlLabel, FormGroup, Stack, Switch, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from 'src/app/store';
import { ColorModeContext } from 'src/ui/styles/useThemeSelector';
import { useLayoutState } from '../../store/LayoutSelector';
import { showHeaderLayoutAction, showFooterLayoutAction } from '../../store/LayoutActions';

export const ConfigurationPage: React.FC = () => 
{
  const theme = useTheme();
  const layoutState = useLayoutState();
  const dispatch = useAppDispatch();

  const [checkedHeader, setCheckedHeader] = useState(layoutState.header.isVisible);
  const [checkedFooter, setCheckedFooter] = useState(layoutState.footer.isVisible);

  const colorMode = React.useContext(ColorModeContext);

  const handleButtonDarkTheme =() =>
  {
    colorMode.toggleColorMode();
  }

  const handleHideHeader =(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
  {
    setCheckedHeader(checked);
    dispatch(showHeaderLayoutAction(checked));
  }    

  const handleHideFooter =(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
  {
    setCheckedFooter(checked);
    dispatch(showFooterLayoutAction(checked));
  }  

  return (
    <Container>
      <Card sx={{mt: '4em'}}>
        <CardContent>
          <Typography variant='h6' mb={2} >
          Тема
          </Typography>
          <Stack spacing={2} direction={'column'} >
            <Button variant='contained' color='primary' onClick={handleButtonDarkTheme} >Темная тема</Button>
            <Button variant='contained' color='secondary'>Светлая тема</Button>
          </Stack>
        </CardContent>
      </Card>
      <Card sx={{mt: '1em'}}>
        <CardContent>
          <Typography variant='h6' mb={2} >
          Ввнешний вид
          </Typography>
          <Stack spacing={2} direction={'column'} >
            <FormGroup>
              <FormControlLabel control={<Switch checked={checkedHeader} onChange={handleHideHeader} />} label="Показать заголовок" />
              <FormControlLabel control={<Switch checked={checkedFooter} onChange={handleHideFooter} />} label="Показать подвал" />
            </FormGroup>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};