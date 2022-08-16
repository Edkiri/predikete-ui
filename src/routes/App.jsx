import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { Layout } from "@containers/Layout";

import { Home } from "@pages/Home";
import { NotFound } from "@pages/NotFound";
import { Signup } from "@pages/Signup";
import { Login } from "@pages/Login";
import { Verify } from "@pages/Verify";
import { Groups } from "@pages/Groups";
import { RequireAuth } from "@containers/RequireAuth";
import { GroupDetail } from "@pages/GroupDetail";
import { ProfileUpdate } from "@pages/ProfileUpdate";
import { NewGroup } from "@pages/NewGroup";
import { UpdateGroup } from "@pages/UpdateGroup";
import { InvitationResponse } from "@pages/InvitationResponse";
import { InviteUser } from "@pages/InviteUser";
import { SuccessInvitation } from "@pages/SuccessInvitation";
import { UpdatePool } from "../pages/UpdatePool";
import { PoolDetails } from "../pages/PoolDetails";
import { PoolMatchDetail } from "../pages/PoolMatchDetail";
import { AllPoolMembers } from "../pages/AllPoolMembers";
import { SearchGroups } from "../pages/SearchGroups";
import { JoinResponse } from "../pages/JoinResponse";
import { Rules } from "../pages/Rules";

import "@styles/global.css";

export const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predikete-ui" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route
            path="update-profile"
            element={
              <RequireAuth>
                <ProfileUpdate />
              </RequireAuth>
            }
          />
          <Route
            path="/my-groups"
            element={
              <RequireAuth>
                <Groups />
              </RequireAuth>
            }
          />
          <Route
            path="/search-groups"
            element={
              <RequireAuth>
                <SearchGroups />
              </RequireAuth>
            }
          />
          <Route
            path="/new-group"
            element={
              <RequireAuth>
                <NewGroup />
              </RequireAuth>
            }
          />
          <Route
            path="/group/:groupId"
            element={
              <RequireAuth>
                <GroupDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/group/:groupId/invite-user"
            element={
              <RequireAuth>
                <InviteUser />
              </RequireAuth>
            }
          />
          <Route
            path="/update-group/:groupId"
            element={
              <RequireAuth>
                <UpdateGroup />
              </RequireAuth>
            }
          />
          <Route
            path="/success-invitation"
            element={
              <RequireAuth>
                <SuccessInvitation />
              </RequireAuth>
            }
          />
          <Route
            path="/invitation/:invitationId"
            element={
              <RequireAuth>
                <InvitationResponse />
              </RequireAuth>
            }
          />
          <Route
            path="/request/:requestId"
            element={
              <RequireAuth>
                <JoinResponse />
              </RequireAuth>
            }
          />
          <Route
            path="/group/:groupId/update-pool/:poolId"
            element={
              <RequireAuth>
                <UpdatePool />
              </RequireAuth>
            }
          />
          <Route
            path="/group/:groupId/pool/:poolId"
            element={
              <RequireAuth>
                <PoolDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/group/:groupId/pool-match-deatil/:poolMatchId"
            element={
              <RequireAuth>
                <PoolMatchDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/group/:groupId/all-members"
            element={
              <RequireAuth>
                <AllPoolMembers />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};
