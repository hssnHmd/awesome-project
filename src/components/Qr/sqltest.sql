SELECT E.* , S.id as id_s ,S.QR_Unix_Time as QR_Unix_Time_s,S.Current_Unix_Time as Current_Unix_Time_s,S.Type as id_Type ,S.Flag as Flag_s,S.User_id as User_id_s,S.Site_pointage as Site_pointage_s,S.pointage_entrer_id  , U.nom , U.prenom  FROM entrerpointages as E 
LEFT JOIN  sortiepointages AS S ON E.id = S.pointage_entrer_id
LEFT JOIN users as U on E.User_id = U.id ;