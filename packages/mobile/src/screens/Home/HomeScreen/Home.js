import React, { useEffect, useState } from 'react';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import TargetGo from '../../../components/TargetGo/TargetGo';
import TargetComponent from '../../../components/Target';
import { getTargets } from '../../../redux/actions/targetActions';
import { getGoals, updateGoal } from '../../../redux/actions/goalActions';
import * as SnackBar from '../../../services/snackBar';
import { colors } from '../../../theme/index.json';

import * as S from './Home.style';

const HomeTop = ({ name, targets }) => (
  <>
    <S.WrapperMe>
      <S.TextMe>Daleeeee,</S.TextMe>
      <S.TextMe bold>{name ?? ''}</S.TextMe>
    </S.WrapperMe>
    <S.TargetContainer>
      <S.TargetText>Metas</S.TargetText>
      <S.TargetsFlatList
        data={targets}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <S.Header />}
        renderItem={({ item }) => (
          <TargetComponent
            title={item.title}
            goals={item.goals}
            progress={item.progress}
            id={item.id}
          />
        )}
        ListEmptyComponent={() => (
          <S.Empty>Nenhuma meta cadastrada ainda</S.Empty>
        )}
        ItemSeparatorComponent={() => <S.Separator />}
        ListFooterComponent={() => <S.Footer />}
      />
    </S.TargetContainer>
    <S.GoalText>Metas de Hoje</S.GoalText>
  </>
);

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { goals } = useSelector((state) => state.goals);
  const { name } = useSelector((state) => state.session.loggedUser);
  const { targets } = useSelector((state) => state.targets);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getTargets());
    dispatch(getGoals());
  }, [dispatch]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(
      getTargets((err) => {
        if (err) {
          SnackBar.message(err);
          setRefreshing(false);
        } else {
          dispatch(
            getGoals((err) => {
              if (err) {
                SnackBar.message(err);
              }
              setRefreshing(false);
            })
          );
        }
      })
    );
  };

  const handlePress = (id, done) => {
    dispatch(
      updateGoal({ id, done }, (err) => {
        if (err) {
          SnackBar.message(err);
        } else {
          dispatch(getTargets());
        }
      })
    );
  };

  const openGoalDetail = (id) => {
    navigation.navigate('goalDetail', { id });
  };

  return (
    <>
      <S.Container>
        <S.TargetGoFlatList
          data={goals}
          keyExtractor={({ id }) => id}
          refreshControl={
            <RefreshControl
              colors={[colors.secoundColor]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ListHeaderComponent={() => <HomeTop name={name} targets={targets} />}
          renderItem={({ item }) => (
            <S.WrapperTarget>
              <TouchableOpacity onPress={() => openGoalDetail(item.id)}>
                <TargetGo
                  title={item.title}
                  checked={item.done}
                  onPress={() => handlePress(item.id, !item.done)}
                />
              </TouchableOpacity>
            </S.WrapperTarget>
          )}
          ListEmptyComponent={() => (
            <S.GoalEmpty>Nenhuma atividade cadastrada ainda</S.GoalEmpty>
          )}
          ListFooterComponent={() => <S.VerticalFooter />}
        />
      </S.Container>
    </>
  );
};

export default HomeScreen;
