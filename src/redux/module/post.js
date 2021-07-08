import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import { actionCreators as imageActions } from "./image";

import moment from "moment";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
};

const initialPost = {
  image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  contents: "",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};
const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    // state에서 페이징 정보 가져오기
    let _paging = getState().post.paging;

    if (_paging.start && !_paging.next) {
      return;
    }
    const postDB = firestore.collection("post");

    let query = postDB.orderBy("insert_dt", "desc");
    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        console.log("docs : ", docs.docs);
        let post_list = [];

        // 새롭게 페이징 정보를 만들어줘요.
        // 시작점에는 새로 가져온 정보의 시작점을 넣고,
        // next에는 마지막 항목을 넣습니다.
        // (이 next가 다음번 리스트 호출 때 start 파라미터로 넘어올거예요.)
        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };

        docs.forEach((doc) => {
          let _post = doc.data();

          let post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf("user_") !== -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
              }
              return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} }
          );

          post_list.push(post);
        });

        // 마지막 하나는 빼줍니다.
        // 그래야 size대로 리스트가 추가되니까요!
        // 마지막 데이터는 다음 페이지의 유무를 알려주기 위한 친구일 뿐! 리스트에 들어가지 않아요!
        post_list.pop();

        dispatch(setPost(post_list, paging));
      });
  };
};

const addPostFB = (contents = "", type = "post1") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    const _user = getState().user.user;
    const _image = getState().image.preview;

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    const _post = {
      ...initialPost,
      contents: contents,
      type: type,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    //   const initialPost = {
    //     image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    //     contents: "",
    //     comment_cnt: 0,
    //     insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    //   };

    _upload
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            dispatch(imageActions.uploadImage(url));
            return url;
          })
          .then((url) => {
            console.log(url);
            postDB
              .add({ ...user_info, ..._post, image_url: url })
              .then((doc) => {
                // 아이디를 추가해요!
                let post = {
                  user_info,
                  ..._post,
                  id: doc.id,
                  image_url: url,
                };
                // 이제 리덕스에 넣어봅시다.
                dispatch(addPost(post));
                dispatch(imageActions.deletePreview());
                history.replace("/");
              })
              .catch((err) => {
                window.alert("앗! 포스트 작성에 문제가 있어요!");
                console.log("post 작성 실패!", err);
              });
          });
      })
      .catch((err) => {
        window.alert("앗! 이미지 업로드에 문제가 있어요!");
        console.log(err);
      });
  };
};

const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }
    const _image = getState().image.preview;
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];

    const postDB = firestore.collection("post");

    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(editPost(post_id, { ...post }));
          history.replace("/");
        });

      return;
    } else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);

            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({ ...post, image_url: url })
              .then((doc) => {
                dispatch(editPost(post_id, { ...post, image_url: url }));
                dispatch(imageActions.deletePreview());

                history.replace("/");
              });
          })
          .catch((err) => {
            window.alert("앗! 이미지 업로드에 문제가 있어요!");
            console.log("앗! 이미지 업로드에 문제가 있어요!", err);
          });
      });
    }
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
  },
  initialState
);
const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  editPostFB,
};

export { actionCreators };
